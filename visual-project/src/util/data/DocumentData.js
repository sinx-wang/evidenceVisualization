export default function DocumentData() {
  const createDocumentData = (documentId, type, body) => {
    return { documentId, type, body };
  };

  const documentDataArray = [
    createDocumentData(0, 0, "单条证据1"),
    createDocumentData(1, 0, "单条证据2"),
    createDocumentData(2, 0, "单条证据3"),
  ];

  const documentData = JSON.stringify(documentDataArray);
  DocumentData.documentData = documentData;
}
