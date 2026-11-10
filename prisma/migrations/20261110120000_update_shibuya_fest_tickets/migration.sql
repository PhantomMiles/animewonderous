-- Update Shibuya Fest ticket tiers while keeping historical ticket/order references intact.
ALTER TABLE "TicketTier"
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

UPDATE "Event"
SET "date" = 'December 12, 2026', "price" = 2000
WHERE "id" = 'shibuya-fest-3';

UPDATE "TicketTier"
SET "isActive" = false
WHERE "eventId" = 'shibuya-fest-3'
  AND "id" IN ('hashira-brigade', 'overlord-legion');

UPDATE "TicketTier"
SET "title" = 'Early Bird', "theme" = 'Early Bird Admission',
    "capacity" = '1 Person', "groupSize" = 1, "price" = 2000,
    "perks" = ARRAY['General admission'], "isActive" = true
WHERE "id" = 'solo-leveling' AND "eventId" = 'shibuya-fest-3';

UPDATE "TicketTier"
SET "title" = 'Regular', "theme" = 'General Admission',
    "capacity" = '1 Person', "groupSize" = 1, "price" = 3000,
    "perks" = ARRAY['General admission'], "isActive" = true
WHERE "id" = 'tag-team-duo' AND "eventId" = 'shibuya-fest-3';

UPDATE "TicketTier"
SET "title" = 'VIP', "theme" = 'VIP Admission',
    "capacity" = '1 Person', "groupSize" = 1, "price" = 7000,
    "perks" = ARRAY['VIP admission'], "isActive" = true
WHERE "id" = 'genin-trio' AND "eventId" = 'shibuya-fest-3';

UPDATE "TicketTier"
SET "title" = 'Squad Pass', "theme" = 'Squad Admission',
    "capacity" = 'Up to 5 People', "groupSize" = 5, "price" = 10000,
    "perks" = ARRAY['Admission for up to 5 attendees'], "isActive" = true
WHERE "id" = 'kage-council' AND "eventId" = 'shibuya-fest-3';
