fetch("family.json")
  .then(res => res.json())
  .then(data => {
    const config = {
  chart: {
    container: "#tree-container",
    rootOrientation: "NORTH",

    // Smooth curved connectors
    connectors: { 
      type: "bCurve", 
      style: { stroke: "#4CAF50", "stroke-width": 2 } 
    },

    // Node styling class
    node: { HTMLclass: "person-node" },

    // Spacing between nodes
    siblingSeparation: 40,   // horizontal space between siblings
    subTeeSeparation: 60     // vertical space between parent and children
  },
  nodeStructure: buildTree(data, 0)
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
