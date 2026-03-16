export interface AudienceType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  phone: string;
  occupation: string;
  timestamp: string;
  isChecked: boolean;
}

export interface CompanyType {
  id: number;
  email: string;
  company: string;
  phone: string;
  isChecked: boolean;
  address: string;
  contactPerson: string;
}

export interface TaskType {
  id: number;
  taskName: string;
  status: string;
  startDate: string;
  dueDate: string;
  assignedTo: string;
  priority: string;
}

export interface LeadsType {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: string;
  description: string;
}

export interface CustomerType {
  customerId: number;
  name: string;
  phone: string;
  group: string;
  customerType: number;
  creditLimit: number;
  openingBalance: number;
  debit: string;
  credit: string;
  closingBalance: string;
  isChecked: boolean;
}

export interface EmployeeType {
  image: string;
  employeeId: number;
  name: string;
  section: string;
  phone: string;
  presentAddress: string;
  showDropdown?: boolean;
}

export interface AttendanceType {
  date: string;
  name: string;
  employeeId: number;
  division: string;
  shift: string;
}

export interface EventApi {
  id: string;
  title: string;
  start: string | Date;
  classNames: string[];
  allDay?: boolean;
  extendedProps?: { category: string };
}
export interface EmailType {
  id: number;
  name: string;
  email_content: string;
}

export interface DateRange {
  startDate?: Date;
  endDate: Date;
  key: string;
}

export interface NavigationLinkType {
  id: number;
  title: string;
  links: {
    name: string;
    hasSub: boolean;
    icon: string;
    sublinks: {
      sublinkUrl: string;
      sublink: string;
    }[];
    url?: string;
  };
}
