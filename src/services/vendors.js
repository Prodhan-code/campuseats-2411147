import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// Each subscription returns an unsubscribe function for useEffect cleanup.
export function subscribeToVendors(onData, onError) {
  return onSnapshot(
    collection(db, 'vendors'),
    (snapshot) =>
      onData(snapshot.docs.map((vendorDoc) => ({
        id: vendorDoc.id,
        ...vendorDoc.data(),
      }))),
    onError
  )
}

export function subscribeToVendor(vendorId, onData, onError) {
  return onSnapshot(
    doc(db, 'vendors', vendorId),
    (snapshot) =>
      onData(
        snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null
      ),
    onError
  )
}

// TODO 1: listen to this vendor's menu subcollection.
export function subscribeToMenu(vendorId, onData, onError) {
  return onSnapshot(
    collection(db, 'vendors', vendorId, 'menu'),
    (snapshot) =>
      onData(
        snapshot.docs.map((menuDoc) => ({
          id: menuDoc.id,
          vendorId,
          ...menuDoc.data(),
        }))
      ),
    onError
  )
}

// Seed the vendor documents and their menu subcollections in one batch.
export async function seedDemoData(vendors) {
  const batch = writeBatch(db)

  for (const { menu, id, ...vendor } of vendors) {
    batch.set(doc(db, 'vendors', id), vendor)

    for (const { id: itemId, ...item } of menu) {
      batch.set(doc(db, 'vendors', id, 'menu', itemId), item)
    }
  }

  await batch.commit()
}