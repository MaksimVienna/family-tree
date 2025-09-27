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
      nodeStructure: buildTree(data, 1)
    };

    new Treant(config);
  });

function buildTree(data, id) {
  const person = data.find(p => p.id === id);
  if (!person) return null;

  return {
    text: { name: person.name },
    image: person.photo,
    HTMLid: `person-${person.id}`,
    link: { href: `profile.html?id=${person.id}` },
    children: person.children.map(childId => buildTree(data, childId))
  };
}
