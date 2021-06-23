import { utilitiesService } from '../../../services/utilities.service.js';
import { storageService } from '../../../services/async-storage-service.js';

const STORAGE_KEY = 'emailApp';

var emails = [
    { subject: 'ori?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'dsaaas?', body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'hi?', body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
]

export const emailService = {
    query
}


const gBooks = defaultBooks;