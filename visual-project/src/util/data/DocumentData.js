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

export default DocumentData;
