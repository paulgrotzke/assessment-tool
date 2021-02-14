import { useHistory } from 'react-router-dom';

const useLocalDocRef = () => {
  const history = useHistory();
  const answeredDocId = localStorage.getItem('docRef')!;

  if (answeredDocId === null || undefined) {
    history.push('/disclaimer');
  }
  return answeredDocId;
};

export default useLocalDocRef;
