-- Ejecuta este archivo completo en el SQL Editor de tu proyecto Supabase.
create table public.personal_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  body text not null check (char_length(body) > 0),
  published_at timestamptz not null default now()
);

alter table public.personal_posts enable row level security;
revoke all on table public.personal_posts from anon, authenticated;
grant select on table public.personal_posts to anon, authenticated;
grant insert on table public.personal_posts to authenticated;
grant update on table public.personal_posts to authenticated;

create policy "Las notas son públicas para lectura"
on public.personal_posts for select to anon, authenticated using (true);

create policy "Solo el autor publica notas"
on public.personal_posts for insert to authenticated
with check ((select auth.jwt() ->> 'email') = 'ricardoalfarog@gmail.com');

create policy "Solo el autor edita notas"
on public.personal_posts for update to authenticated
using ((select auth.jwt() ->> 'email') = 'ricardoalfarog@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'ricardoalfarog@gmail.com');
