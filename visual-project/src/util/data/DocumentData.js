const DocumentData = {};

const createDocumentData = (documentId, type, body, agree) => {
  return { documentId, type, body, agree };
};

const documentDataArray = [
  createDocumentData(0, 0, "单条证据1", false),
  createDocumentData(1, 0, "单条证据2", false),
  createDocumentData(2, 0, "单条证据3", false),
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

const contradictDocsArray = [
  createContradictDocs(0, 0, "矛盾证据第一", false, 0),
  createContradictDocs(1, 1, "矛盾证据第二", true, 1),
];

const contradictDocs = JSON.stringify(contradictDocsArray);

DocumentData.contradictDocs = contradictDocs;

export default DocumentData;
