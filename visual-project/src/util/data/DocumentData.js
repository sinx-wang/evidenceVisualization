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

export default DocumentData;
