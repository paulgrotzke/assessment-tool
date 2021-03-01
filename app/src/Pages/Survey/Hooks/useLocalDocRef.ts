const useLocalDocRef = () => {
  const answeredDocId = localStorage.getItem('docRef')!;

  return answeredDocId;
};

export default useLocalDocRef;
