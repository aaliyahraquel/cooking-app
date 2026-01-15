import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFirestore = (collectionName, searchQuery = null) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const fetchData = async () => {
      try {
        // Get all documents from the collection
        const snapshot = await getDocs(collection(db, collectionName))
        let results = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))

        // Filter by search query (case-insensitive)
        if (searchQuery && searchQuery.trim().length > 0) {
          const lowerQuery = searchQuery.toLowerCase()
          results = results.filter(item =>
            item.title.toLowerCase().includes(lowerQuery)
          )
        }

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
