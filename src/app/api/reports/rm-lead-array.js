// Shared by the RM report routes (not a route itself: only route.js files are).
//
// Builds the `rmLeadArray` the reports UI reads: index = rm_user_id, value =
// that RM's lead ids, in the order of `leads`. Only RMs present in `groups`
// get an entry. Same result as the old loop over every lead once per RM, but in
// a single pass.
export function buildRmLeadArray(groups, leads) {
  const rmLeadArray = [];
  for (const group of groups) {
    rmLeadArray[group.rm_user_id] = [];
  }
  for (const lead of leads) {
    const rmLeads = rmLeadArray[lead.rm_user_id];
    if (rmLeads) {
      rmLeads.push(lead.lead_id);
    }
  }
  return rmLeadArray;
}
