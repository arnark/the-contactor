import * as FileSystem from 'expo-file-system';
import * as Contacts from 'expo-contacts';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

function getNewContactId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function sortContactsByName(contactsArray) {
  contactsArray.sort((a, b) => {
    return a.contactName.localeCompare(b.contactName);
  })
}

async function createContactsDirectory() {
  const dir = await FileSystem.getInfoAsync(contactsDirectory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(contactsDirectory);
  }
}

export const cleanDirectory = async () => {
  await FileSystem.deleteAsync(contactsDirectory);
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

  sortContactsByName(allContacts);
  return Promise.all(allContacts.map(async (contact) => {
    return {
      contactId: contact.contactId,
      contactName: contact.contactName,
      contactPhoneNumber: contact.contactPhoneNumber,
      contactPhoto: contact.contactPhoto
    };
  }));
}

export const searchForContacts = async (str) => {
  const allContacts = await getAllContacts();
  const foundContacts = [];
  for (let i = 0; i < allContacts.length; i += 1) {
    const searchStr = str.toLowerCase();
    const contactName = allContacts[i].contactName.toLowerCase();
    if (contactName.includes(searchStr)) {
      foundContacts.push(allContacts[i]);
    }
  }

  sortContactsByName(foundContacts);
  return Promise.all(foundContacts.map(async (contact) => {
    return {
      contactId: contact.contactId,
      contactName: contact.contactName,
      contactPhoneNumber: contact.contactPhoneNumber,
      contactPhoto: contact.contactPhoto
    };
  }));
}

export const createNewContact = async (contactName, contactPhoneNumber, contactPhoto) => {
  const contactId = getNewContactId();
  const dashedContactName = contactName.replace(/\s+/g, '-').toLowerCase();
  const fileUri = `${contactsDirectory}/${dashedContactName}.json`;
  if (typeof contactPhoneNumber === 'undefined') { return { status: false, message: 'Invalid phone number.' }; }
  const strippedPhoneNumber = contactPhoneNumber.replace(/[- )(]/g, '');

  if (contactName === '') {
    return { status: false, message: 'Name can not be empty.' };
  } if (strippedPhoneNumber === '') {
    return { status: false, message: 'Phone number not be empty.' };
  } if (isNaN(strippedPhoneNumber)) {
    return { status: false, message: 'Invalid phone number.' };
  }

  const contact = JSON.stringify({
    contactId,
    contactName,
    contactPhoneNumber: strippedPhoneNumber,
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
    return { status: false, message: 'Failed to create contact. Please try again.' };
  }
}

export const importContacts = async () => {
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.PHONE_NUMBERS,
      Contacts.IMAGE
    ],
  });

  for (let i = 0; i < data.length; i += 1) {
    const contactName = data[i].name;
    let contactNumber = '';
    try {
      contactNumber = data[i].phoneNumbers[0].digits;
    } catch (err) {
      console.log('undefined phone number');
    }
    let contactImage = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png';
    if (data[i].image !== undefined) {
      contactImage = data[i].image.uri;
    }
    await createNewContact(contactName, contactNumber, contactImage);
  }
}
