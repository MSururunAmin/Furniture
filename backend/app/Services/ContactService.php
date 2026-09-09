<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\ContactRepositoryInterface;

class ContactService
{
    public function __construct(
        protected ContactRepositoryInterface $contacts
    ) {}

    public function all(): Collection
    {
        return $this->contacts->all();
    }

    public function find(int $id): ?Contact
    {
        return $this->contacts->find($id);
    }

    public function create(array $data): Contact
    {
        return $this->contacts->create($data);
    }

    public function update(Contact $contact, array $data): Contact
    {
        return $this->contacts->update($contact, $data);
    }

    public function delete(Contact $contact): bool
    {
        return $this->contacts->delete($contact);
    }
}