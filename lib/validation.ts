import { z } from "zod";

const nameRegex = /^[A-Za-z0-9&\- ]+$/;
const phoneRegex = /^[0-9+\-() ]+$/;

// Helper for names
const nameString = (field: string) =>
  z
    .string()
    .trim()
    .min(2, `${field} must be at least 2 characters`)
    .max(50, `${field} is too long`)
    .regex(nameRegex, `${field} contains invalid characters`);

// Helper for phone numbers
const phoneString = (field: string) =>
  z
    .string()
    .min(10, `${field} must be at least 10 digits`)
    .max(15, `${field} is too long`)
    .regex(phoneRegex, `${field} contains invalid characters`);

// Helper for numeric IDs
const numericId = (field: string) =>
  z.coerce.number().gt(0, {
    message: `Please select a ${field}`,
  });



export const roleSchema = z.object({
  role_name: nameString("Role name"),
});

export const sourceSchema = z.object({
  source_name: nameString("Source name"),
});

export const stateSchema = z.object({
  state_name: nameString("State name"),
});

export const leadStatusSchema = z.object({
  lead_status_name: nameString("Lead status name"),
});

export const citySchema = z.object({
  city_name: nameString("City name"),
  state_id: numericId("state"),
});

export const subSourceSchema = z.object({
  sub_source_name: nameString("Sub source name"),
  source_id: numericId("source"),
});

export const userSchema = z.object({
  name: nameString("Name"),
  email: z.string().email("Invalid email address"),
  phone_no: phoneString("Phone number"),
  role_id: numericId("Role"),
  reporting_to_id: numericId("Reporting manager"),
  general_manager_id: numericId("General manager"),
  // password: z.string().min(6, "Password must be at least 6 characters"),
  // confirm_password: z.string().min(6, "Confirm password must be at least 6 characters"),
});


export const userTeamSchema = z.object({
  team_name: nameString("Name"),
  team_leader_id: numericId("Team leader"),
  members: z.array(numericId("Member")).default([]),
});

export const projectSchema = z.object({
  project_name: nameString("Project name"),
  city_id: numericId("city"),
});

export const leadSchema = z.object({
  customer_name: nameString("Name"),
  email_id: z.string().email("Invalid email address"),
  alternate_email: z.string().email("Invalid email address"),
  mobile_no: phoneString("Phone number"),
  alternate_no: phoneString("Phone number"),
  // whatsapp_no: phoneString("Phone number"),
  project_id: numericId("project"),
  source_id: numericId("source"),
  sub_source_id: numericId("sub source"),
  rm_user_id: numericId("user"),
  lead_status_id: numericId("lead status"),
});

export type UserInput = z.infer<typeof userSchema>;
export type RoleInput = z.infer<typeof roleSchema>;
