-- Migration: create newsletter_subscribers table

create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid not null default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);
