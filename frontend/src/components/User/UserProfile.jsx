
function UserProfile() {
  const githubUser = JSON.parse(localStorage.getItem("githubUser"));

  if (!githubUser) {
    return <div className="text-white"> Please log in to view your profile.</div>;
  }

  return (
    <div className="text-white p-8">
      <img
        src={githubUser.avatarUrl}
        alt="Avatar"
        className="w-32 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold">
        {githubUser.name || githubUser.username}
      </h2>
      <p className="text-lg">@{githubUser.username}</p>
      <p className="text-md">{githubUser.email}</p>
    </div>
  );
}

export default UserProfile;
