import * as FileSystem from 'expo-file-system';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

async function createContactsDirectory() {
  const dir = await FileSystem.getInfoAsync(contactsDirectory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(contactsDirectory);
  }
}

export const createNewContact = async (contactName, contactPhoneNumber, contactPhoto) => {
  const fileUri = `${contactsDirectory}/${contactName}.json`

  const contact = JSON.stringify({
    contactName,
    contactPhoneNumber,
    contactPhoto
  });

  try {
    // Check if contacts directory exists, create new if it doesn't
    await createContactsDirectory();

    // Create the new contact
    await FileSystem.writeAsStringAsync(fileUri, contact, {
      encoding: FileSystem.EncodingType.UTF8
    });

    return { status: true };
  } catch (e) {
    return { status: false };
  }
}

export const getAllContacts = async () => {
  let result = null;
  try {
    result = await FileSystem.readDirectoryAsync(contactsDirectory, {
      encoding: FileSystem.EncodingType.UTF8
    });
  } catch (e) {
    console.log(e);
  }
  console.log(result)
  return result;
}

export const getContactByUri = async (fileUri) => {
  let result = null;
  try {
    result = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.UTF8
    });
  } catch (e) {
    console.log(e);
  }
  return result;
}
