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
  let filename = dashedContactName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  filename = filename.replace(/Þ|þ/g, 't');
  filename = filename.replace(/Ð|ð/g, 'th');
  filename = filename.replace(/æ|Æ/g, 'ae');
  const fileUri = `${contactsDirectory}/${filename}.json`;
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

export const EditContact = async (oldId, contactName, contactPhoneNumber, contactPhoto) => {
  deleteContact(oldId)
  const contactId = getNewContactId();
  const dashedContactName = contactName.replace(/\s+/g, '-').toLowerCase();
  let filename = dashedContactName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  filename = filename.replace(/Þ|þ/g, 't');
  filename = filename.replace(/Ð|ð/g, 'th');
  filename = filename.replace(/æ|Æ/g, 'ae');
  const fileUri = `${contactsDirectory}/${filename}.json`;
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

    // Create the new contact
    await FileSystem.writeAsStringAsync(fileUri, contact, {
      encoding: FileSystem.EncodingType.UTF8
    });

    return { status: true };
  } catch (e) {
    return { status: false, message: 'Failed to update contact. Please try again.' };
  }
}

export function deleteContact(contactId) {
  for (let i = 0; i < getAllContacts.length ; i +=1) {
    if (getAllContacts[i].contactId === contactId) {
      getAllContacts.splice(i, 1);
    }
  }
};

export const importContacts = async () => {
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.PHONE_NUMBERS,
      Contacts.IMAGE
    ],
  });

  for (let i = 0; i < data.length; i += 1) {
    let contactName = '';
    let contactNumber = '000';
    let contactImage = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png';

    try {
      // Import phone numbers
      data[i].phoneNumbers.forEach((num) => {
        if (num.number !== undefined || num.number !== '') {
          contactNumber = num.number;
        }
      });

      // Import name
      contactName = data[i].name;

      // Import image if it exists
      if (data[i].image !== undefined) {
        contactImage = data[i].image.uri;
      }
    } catch (e) {
      // continue if there is some problem with imported data
      console.log(e);
      continue;
    }

    if (contactName === undefined) { contactName = 'invalid name'; }
    if (contactNumber === undefined) { contactNumber = '777'; }
    createNewContact(contactName, contactNumber, contactImage);
  }
}
