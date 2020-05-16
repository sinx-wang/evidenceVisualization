const DocumentData = {};

const createDocumentData = (documentId, type, body, agree) => {
  return { documentId, type, body, agree };
};

const documentDataArray = [
  createDocumentData(0, 0, "单条证据1", false),
  createDocumentData(1, 1, "单条证据2", false),
  createDocumentData(2, 2, "单条证据3", false),
];

const documents = JSON.stringify(documentDataArray);

DocumentData.documents = documents;

const creatHeadData = (documentId, key, label) => {
  return { documentId, key, label };
};

const headData = [
  creatHeadData(0, 0, "时间"),
  creatHeadData(0, 1, "地点"),
  creatHeadData(0, 2, "人物"),
];

const heads = JSON.stringify(headData);

DocumentData.heads = heads;

const createContradictDocs = (documentId, type, body, agree, role) => {
  return { documentId, type, body, agree, role };
};

// 矛盾证据
const contradictDocsArray = [
  {
    contradictId: 0,
    documents: [
      createContradictDocs(0, 0, "矛盾证据第一", false, 0),
      createContradictDocs(1, 1, "矛盾证据第二", true, 1),
      createContradictDocs(2, 2, "矛盾证据第三", false, 1),
    ],
  },
  {
    contradictId: 1,
    documents: [
      createContradictDocs(3, 0, "矛盾证据第三", false, 0),
      createContradictDocs(4, 1, "矛盾证据第四", true, 1),
    ],
  },
  {
    contradictId: 2,
    documents: [
      createContradictDocs(5, 2, "矛盾证据第五", false, 0),
      createContradictDocs(6, 1, "矛盾证据第六", true, 1),
    ],
  },
];

const contradictDocs = JSON.stringify(contradictDocsArray);

DocumentData.contradictDocs = contradictDocs;

const createFactsData = (factId, body, agree) => {
  return { factId, body, agree };
};

const factsDataArray = [
  createFactsData(0, "事实文本第一条", true),
  createFactsData(1, "事实文本第二条", true),
  createFactsData(2, "事实文本第三条", true),
];

const facts = JSON.stringify(factsDataArray);

DocumentData.facts = facts;

// 事实节点
const createFactNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const factNodeArray1 = [
  createFactNode(1, 1, "事实文本一"),
  createFactNode(2, 2, "事实文本二"),
  createFactNode(3, 3, "事实文本三"),
];

const factNodeArray2 = [
  createFactNode(4, 4, "事实文本四"),
  createFactNode(5, 5, "事实文本五"),
  createFactNode(6, 6, "事实文本六"),
];

const getFacts = [
  {
    confirm: 1,
    body: factNodeArray1,
  },
  {
    confirm: 0,
    body: factNodeArray2,
  },
];

DocumentData.getFacts = getFacts;

// 证据节点
const createEvidenceNode = (id, logicNodeId, text, type, role) => {
  return { id, logicNodeId, text, type, role };
};

const evidenceNodeArray1 = [
  createEvidenceNode(1, 7, "证据文本一", 2, 0),
  createEvidenceNode(2, 8, "证据文本二", 3, 0),
  createEvidenceNode(3, 9, "证据文本三", 2, 1),
  createEvidenceNode(4, 10, "证据文本四", 4, 0),
];

const evidenceNodeArray2 = [
  createEvidenceNode(5, 11, "证据文本五", 1, 1),
  createEvidenceNode(6, 12, "证据文本六", 3, 0),
  createEvidenceNode(7, 13, "证据文本七", 2, 1),
];

const getEvidences = [
  {
    confirm: 1,
    body: evidenceNodeArray1,
  },
  {
    confirm: 2,
    body: evidenceNodeArray2,
  },
];
DocumentData.getEvidences = getEvidences;

// 链头节点
const createHeadNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const headNodeArray1 = [
  createHeadNode(1, 14, "链头一"),
  createHeadNode(2, 15, "链头二"),
  createHeadNode(3, 16, "链头三"),
];

DocumentData.getHeads = headNodeArray1;

// 联结点节点
const createJointNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const JointNodeArray1 = [
  createJointNode(1, 14, "链头一"),
  createJointNode(2, 15, "链头二"),
  createJointNode(3, 16, "链头三"),
];

DocumentData.getJoint = JointNodeArray1;

export default DocumentData;
