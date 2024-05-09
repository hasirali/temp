export default function LikesModal({ users }) {
    return (
        <div className="likes-modal">
            <h2>Likes</h2>
            <ul>
                {users && users.map(item => (
                    <div>{item}</div>
                ))}

            </ul>
        </div>
    );
}
