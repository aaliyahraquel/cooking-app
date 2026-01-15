import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFirestoreDocument = (collectionName, docId) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const fetchDocument = async () => {
      try {
        const docRef = doc(db, collectionName, docId)
        const docSnapshot = await getDoc(docRef)

        if (docSnapshot.exists()) {
          setData({
            ...docSnapshot.data(),
            id: docSnapshot.id
          })
        } else {
          setError('Recipe not found')
        }

        setIsPending(false)
      } catch (err) {
        setIsPending(false)
        setError('Could not fetch the recipe')
        console.log(err)
      }
    }

    if (docId) {
      fetchDocument()
    }
  }, [collectionName, docId])

  return { data, isPending, error }
}
