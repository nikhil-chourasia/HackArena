import React, { Children } from "react";
import { Octokit } from "@octokit/rest";

function buildTree(flatTree) {
    const root = {}

    flatTree.forEach(item => {
        const parts = item.path.split('/')
        let current = root

        parts.forEach((part, i) => {
            if(!current[part]) {
                current[part] = {
                    __type: i == parts.length - 1 ? item.type : 'tree',
                    __children: {},
                }
            }
            current = current[part].__children
        })
    });
    return root
}

function Tree({data}) {
    return (
        <ul className="ml-4">
            {Object.entries(data).map(([name, value]) => {
                const isFolder = value.__type === 'tree'

                return(
                    <li key={name} className="text-white">
                        {isFolder ? (
                            <details>
                                <summary>📁 {name}</summary>
                                <Tree data={value.__children} />
                            </details>
                        ) : (
                            <span>📄 {name}</span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoExplorer() {
    const [repoTree, setRepoTree] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const octokit = new Octokit(
        {
            auth: import.meta.env.VITE_GITHUB_TOKEN
        }
    );

    React.useEffect(() => {
        const fetchRepoTree = async () => {
            try {
                const branchRes = await octokit.repos.get(
                    {
                        owner: "nikhil-chourasia",
                        repo: "HackArena",
                    }
                )
                const branch = branchRes.data.default_branch

                const commitRes = await octokit.repos.getBranch({
                    owner: "nikhil-chourasia",
                    repo: "HackArena",
                    branch,
                })

                const treeSha = commitRes.data.commit.commit.tree.sha

                const treeRes = await octokit.git.getTree({
                    owner: "nikhil-chourasia",
                    repo: "HackArena",
                    tree_sha: treeSha,
                    recursive: "true"
                })

                setRepoTree(treeRes.data.tree)
                setLoading(false)

            } catch (error) {
            console.error("Error fetching repository tree:", error);
            setLoading(false);
            }
        }
        fetchRepoTree();
    })

    if (loading) return <div className="text-white">Loading File Structure...</div>

    return (
        <div className="text-white">
      <h2 className="text-lg font-semibold mb-2">Repository Structure</h2>
      <Tree data={buildTree(repoTree)} />
    </div>
  )
}

export default RepoExplorer;