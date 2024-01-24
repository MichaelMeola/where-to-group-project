// placeholder data for group component
const groups = [
    { groupId: '1', name: 'cool group', zip: '12345' },
    { groupId: '2', name: 'awesome group', zip: '67890' },
];
Group(groups);
export default function Group(props) {
    
    // console.log(groups);
    const mappedGroup = groups.map((group) => {
        return (
            <div key={group.groupId}>
                <p>groupId: {group.groupId}</p>
                <p>name: {group.name}</p>
                <p>zip: {group.zip}</p>
            </div>
        );
    });

    return (
        <div>
            <h1>{mappedGroup}</h1>
        </div>
    );
}

// Usage:


