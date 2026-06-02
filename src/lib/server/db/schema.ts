import { pgTable, uuid, text, varchar, timestamp, integer, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";

// Enums (berdasarkan BRD)
export const roleEnum = pgEnum('role', ['BPM', 'Auditor', 'Auditee']);
export const periodStatusEnum = pgEnum('period_status', ['Draft', 'Aktif', 'Selesai', 'Dikunci']);
export const assignmentStatusEnum = pgEnum('assignment_status', ['Belum Dimulai', 'In Progress', 'Audit Completed', 'BAA Approved']);
export const auditResultStatusEnum = pgEnum('audit_result_status', ['Draft', 'Final']);
export const findingTypeEnum = pgEnum('finding_type', ['KTS', 'OB']);
export const findingStatusEnum = pgEnum('finding_status', ['Open', 'Waiting Auditor Review', 'Closed']);
export const baaStatusEnum = pgEnum('baa_status', ['Draft', 'Menunggu Persetujuan', 'Disetujui', 'Ditolak']);
export const rejectedByEnum = pgEnum('rejected_by', ['Auditor', 'Auditee']);

// Tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const periods = pgTable('periods', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(), // Contoh: "AMI Semester Gasal 2025/2026"
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: periodStatusEnum('status').default('Draft').notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const instruments = pgTable('instruments', {
  id: uuid('id').primaryKey().defaultRandom(),
  periodId: uuid('period_id').references(() => periods.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  version: integer('version').default(1).notNull(),
  isLocked: boolean('is_locked').default(false).notNull(),
});

export const instrumentItems = pgTable('instrument_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  instrumentId: uuid('instrument_id').references(() => instruments.id).notNull(),
  code: varchar('code', { length: 50 }).notNull(), // Contoh: "STD-1.1"
  question: text('question').notNull(),
  weight: decimal('weight', { precision: 3, scale: 2 }).notNull(), // 0.0 - 1.0
  category: varchar('category', { length: 50 }).notNull(), // "OBE", "IKU", dll.
  sequence: integer('sequence').notNull(),
});

export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  periodId: uuid('period_id').references(() => periods.id).notNull(),
  auditorId: uuid('auditor_id').references(() => users.id).notNull(),
  auditeeId: uuid('auditee_id').references(() => users.id).notNull(),
  status: assignmentStatusEnum('status').default('Belum Dimulai').notNull(),
});

export const auditResults = pgTable('audit_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => assignments.id).notNull(),
  status: auditResultStatusEnum('status').default('Draft').notNull(),
  submittedAt: timestamp('submit_at'),
  totalScore: decimal('total_score', { precision: 5, scale: 2 }).default('0'),
  lastAuditorId: uuid('last_auditor_id').references(() => users.id), // Auditor yang finalisasi
});

export const pointScores = pgTable('point_scores', {
  id: uuid('id').primaryKey().defaultRandom(),
  auditResultId: uuid('audit_result_id').references(() => auditResults.id).notNull(),
  instrumentItemId: uuid('instrument_item_id').references(() => instrumentItems.id).notNull(),
  score: integer('score'), // 1 - 4
  auditorNote: text('auditor_note'),
  evidenceUrl: text('evidence_url'),
  autoSavedAt: timestamp('auto_saved_at'),
});

export const findings = pgTable('findings', {
  id: uuid('id').primaryKey().defaultRandom(),
  pointScoreId: uuid('point_score_id').references(() => pointScores.id).notNull(),
  type: findingTypeEnum('type').notNull(), // KTS / OB
  description: text('description').notNull(),
  recommendation: text('recommendation').notNull(),
  status: findingStatusEnum('status').default('Open').notNull(),
  deadline: timestamp('deadline'),
  rejectionNote: text('rejection_note'),
});

export const actionPlans = pgTable('action_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  findingId: uuid('finding_id').references(() => findings.id).notNull(),
  actionDescription: text('action_description').notNull(),
  targetDate: timestamp('target_date').notNull(),
  evidenceUrl: text('evidence_url'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  revisionNumber: integer('revision_number').default(1).notNull(),
});

export const baa = pgTable('baa', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => assignments.id).notNull(),
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
  auditorApprovedAt: timestamp('auditor_approved_at'),
  auditeeApprovedAt: timestamp('auditee_approved_at'),
  rejectedBy: rejectedByEnum('rejected_by'),
  rejectionNote: text('rejection_note'),
  status: baaStatusEnum('status').default('Draft').notNull(),
});
