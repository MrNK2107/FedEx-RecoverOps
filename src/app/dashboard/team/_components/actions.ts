
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addUser } from '@/lib/data';

const createEmployeeSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  dcaId: z.string(),
});

export async function createEmployeeAction(
  values: z.infer<typeof createEmployeeSchema>
) {
  const validatedFields = createEmployeeSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid input data.');
  }

  const { name, email, dcaId } = validatedFields.data;

  // In a real app, you'd also handle password creation/invitation flow
  await addUser({
    name,
    email,
    dcaId,
    role: 'dca_employee',
  });

  revalidatePath('/dashboard/team');
}
