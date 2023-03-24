import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthComponent {
  loading = false;
  message = '';

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      this.message = 'Check your email for the login link!';
    } catch (error) {
      if (error instanceof Error) {
        this.message = error.message;
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
