-- Performance indexes for the CRM database (MySQL 8).
--
-- Before this script, `lead` and `lead_status_entry` had only a primary key,
-- so every lead list, dashboard count, history lookup and reminder poll did a
-- full table scan. These indexes match the WHERE / ORDER BY clauses the app
-- actually runs.
--
-- Safe to run on the live database:
--   * adds indexes only; no data is changed
--   * InnoDB builds secondary indexes online, so the app keeps working
--   * if a statement fails with "Duplicate key name", that index already
--     exists; skip it and run the rest
--
-- Keep prisma/schema.prisma in sync: the same indexes are declared there with
-- @@index(..., map: "<name>").

-- ---------------------------------------------------------------------------
-- lead
-- ---------------------------------------------------------------------------

-- RM / team-scoped lead lists and dashboard counts:
--   WHERE rm_user_id IN (...) AND flag = 0 AND lead_status_id NOT IN (6, 7)
CREATE INDEX idx_lead_rm_flag_status ON `lead` (rm_user_id, flag, lead_status_id);

-- Admin lead lists and dashboard counts:
--   WHERE flag = 0 AND lead_status_id ...
CREATE INDEX idx_lead_flag_status ON `lead` (flag, lead_status_id);

-- Lead list sort order:  ORDER BY modified_at
CREATE INDEX idx_lead_modified_at ON `lead` (modified_at);

-- Due / overdue / upcoming filters and counts:
--   WHERE flag = 0 AND schedule_date ...
CREATE INDEX idx_lead_flag_schedule ON `lead` (flag, schedule_date);

-- Header reminders (requested by every open browser tab):
--   WHERE rm_user_id = ? AND schedule_date_time BETWEEN ? AND ?
CREATE INDEX idx_lead_rm_schedule_dt ON `lead` (rm_user_id, schedule_date_time);

-- Project filter on the leads page
CREATE INDEX idx_lead_project ON `lead` (project_id);

-- "Created from / to" filter on the leads page
CREATE INDEX idx_lead_created_at ON `lead` (created_at);

-- ---------------------------------------------------------------------------
-- lead_status_entry (lead history; grows on every lead update)
-- ---------------------------------------------------------------------------

-- History per lead (history panel, history count column, last entry)
CREATE INDEX idx_lse_lead ON `lead_status_entry` (lead_id);

-- "Today" dashboard counts and day reports:  WHERE created_at BETWEEN ...
CREATE INDEX idx_lse_created_at ON `lead_status_entry` (created_at);

-- Same, scoped to an RM / team
CREATE INDEX idx_lse_rm_created ON `lead_status_entry` (rm_user_id, created_at);

-- SVD / closure counts:  WHERE to_status_id = ? [AND rm_user_id IN (...)]
CREATE INDEX idx_lse_to_status ON `lead_status_entry` (to_status_id, rm_user_id);

-- ---------------------------------------------------------------------------
-- user_team_member (looked up on every lead request by a non-admin user)
-- ---------------------------------------------------------------------------
CREATE INDEX idx_utm_leader ON `user_team_member` (leader_id, flag);
