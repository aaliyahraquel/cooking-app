import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFirestore = (collectionName, searchQuery = null) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const fetchData = async () => {
      try {
        let q

        if (searchQuery) {
          // Search by title
          q = query(
            collection(db, collectionName),
            where('title', '>=', searchQuery),
            where('title', '<=', searchQuery + '\uf8ff')
          )
        } else {
          q = collection(db, collectionName)
        }

        const snapshot = await getDocs(q)
        const results = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))

        setIsPending(false)
        setData(results)
        setError(null)
      } catch (err) {
        setIsPending(false)
        setError('Could not fetch the data')
        console.log(err)
      }
    }

    if (collectionName) {
      fetchData()
    }
  }, [collectionName, searchQuery])

  return { data, isPending, error }
}
