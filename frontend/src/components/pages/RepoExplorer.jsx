import React, { Children } from "react";
import { Octokit } from "@octokit/rest";
import "./RepoExplorer.css";
import folder from "../../assets/folder.png";
import { getClassWithColor } from "file-icons-js";
import "../../assets/icons/file-icons.css"; // adjust path as needed



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

function Tree({data, onFileClick, currentPath = ''}) {
    return (
        <ul className="ml-4 exploerer-list">
            {Object.entries(data).map(([name, value]) => {
                const isFolder = value.__type === 'tree'
                const fullPath = currentPath ? `${currentPath}/${name}` : name

                return(
                    <li key={name} className="text-white explorer-items">
                        {isFolder ? (
                            <details>
                                <summary><img src={folder} alt="" className="width-[14px]"/> {name}</summary>
                                <Tree data={value.__children} onFileClick={onFileClick} currentPath={fullPath} />
                            </details>
                        ) : (
                            <span
                                onClick={() => onFileClick(fullPath)}
                                className="file-entry cursor-pointer hover:text-green-400 flex items-center"
                            >
                                <i className={`mr-2 ${getClassWithColor(name)}`} />
                                {name}
                            </span>

                        )}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoExplorer({ onFileSelect }) {
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
        <div className="text-white explorer-container">
            <h2 className="text-lg font-semibold mb-2 explorer-heading">Repository Structure</h2>
            <Tree data={buildTree(repoTree)} onFileClick={onFileSelect}/>
        </div>
  )
}

export default RepoExplorer;