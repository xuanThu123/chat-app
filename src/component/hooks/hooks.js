import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { AppContext } from "../../Context/AppContext";
import { db } from "../../firebase/config";

export const useAuth = () => useContext(AuthContext);

export const useRooms = () => useContext(AppContext);

export const useFirestore = (collection, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let documentRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocument([]);
        return;
      }
      documentRef = documentRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = documentRef.onSnapshot((snapshot) => {
      const document = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocument(document);
    });

    return () => unsubscribe();
  }, [collection, condition]);
  return document;
};
