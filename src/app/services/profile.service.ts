import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private supabase: SupabaseService) {}

  getUser(username: string) {
    return from(
      this.supabase.client
        .from('profiles')
        .select('*')
        .match({ username })
        .single()
        .throwOnError()
    );
  }
}
