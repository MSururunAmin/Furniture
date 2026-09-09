<?php

namespace App\Repositories\Eloquent;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\ContactRepositoryInterface;

class ContactRepository implements ContactRepositoryInterface
{
    public function all(): Collection
    {
        return Contact::latest()->get();
    }

    public function find(int $id): ?Contact
    {
        return Contact::find($id);
    }

    public function create(array $data): Contact
    {
        return Contact::create($data);
    }

    public function update(Contact $contact, array $data): Contact
    {
        $contact->update($data);

        return $contact->refresh();
    }

    public function delete(Contact $contact): bool
    {
        return $contact->delete();
    }
}