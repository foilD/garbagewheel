let createTreeData = function(path = '0', level = 3, count = 10) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
        title: key,
        label: key,
        key,
      };
  
        if(level===3){
          treeNode.children = createTreeData(key,level-1,10)
        }
        if(level===2){
          treeNode.children = createTreeData(key,level-1,10)
        }
        if(level===1){
          treeNode.children = createTreeData(key,level-1,100)
        }
      // if (level === 1 && key === '0-0-0-0') {
      //   // 构建100万个子节点
      //   treeNode.children = createTreeData(key, level - 1 , 1000);
      // } else if (level > 0) {
      //   treeNode.children = createTreeData(key, level - 1);
      // }
  
      list.push(treeNode);
    }
    return list;
  };

  // let nodes = createTreeData()
//   console.log(nodes[0].children[0].children[0])

let flatTree = function (tree,level,ancestors=[]){
    let flatArr = []
    tree.forEach(element => {
        const {children, ...rest}=element
        const currentNode = {...rest,level,ancestors:[...ancestors]}
        flatArr.push(currentNode)
        if(children&&children.length>0){
            flatArr = flatArr.concat(flatTree(children,level+1,[...ancestors,currentNode]))
        }
    });
    return flatArr
}

// console.log(flatTree(nodes,0,[]))
export default{ flatTree,createTreeData}