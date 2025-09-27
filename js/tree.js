fetch("family.json")
  .then(res => res.json())
  .then(data => {
    const config = {
      chart: {
        container: "#tree-container",
        rootOrientation: "NORTH",
        connectors: { type: "step" },
        node: { HTMLclass: "person-node" }
      },
      nodeStructure: buildTree(data, 0) // start from root id=0
    };
    new Treant(config);
  });

function buildTree(data, id) {
  const person = data.find(p => p.id === id);
  if (!person) return null;

  return {
    text: { name: person.name },
    image: person.photo,
    link: { href: `profile.html?id=${person.id}` },
    children: (person.children || []).map(childId => buildTree(data, childId))
  };
}
