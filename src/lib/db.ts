import Dexie, { Table } from 'dexie';

export interface Event {
  id?: number;
  type: string;
  title: string;
  date: Date;
  location?: string;
  notes?: string;
}

export class LifeStreamDB extends Dexie {
  events!: Table<Event>;

  constructor() {
    super('LifeStreamDB');
    this.version(1).stores({
      events: '++id, type, title, date'
    });
  }
}

export const db = new LifeStreamDB();