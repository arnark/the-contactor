import * as FileSystem from 'expo-file-system';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;


async function createContactsDirectory() {
  const dir = await FileSystem.getInfoAsync(contactsDirectory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(contactsDirectory);
  }
}

export const cleanDirectory = async () => {
  await FileSystem.deleteAsync(contactsDirectory);
}

export const createNewContact = async (contactName, contactPhoneNumber, contactPhoto) => {
  const fileUri = `${contactsDirectory}/${contactName}.json`

  const contact = JSON.stringify({
    contactId: Math.floor(Math.random() * 1000) + 1,
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
  // Check if contacts directory exists, create new if it doesn't
  await createContactsDirectory();

  let result = null;
  const allContacts = []
  try {
    result = await FileSystem.readDirectoryAsync(contactsDirectory, {
      encoding: FileSystem.EncodingType.UTF8
    });

    for (let i = 0; i < result.length; i += 1) {
      const contactInfo = await FileSystem.readAsStringAsync(`${contactsDirectory}/${result[i]}`, {
        encoding: FileSystem.EncodingType.UTF8
      });
      allContacts.push(JSON.parse(contactInfo));
    }
  } catch (e) {
    console.log(e);
  }

  return Promise.all(allContacts.map(async (contact) => {
    return {
      contactId: contact.contactId,
      contactName: contact.contactName,
      contactPhoneNumber: contact.contactPhoneNumber,
      contactPhoto: contact.contactPhoto
    };
  }));
}
