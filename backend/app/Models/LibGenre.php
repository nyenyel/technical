<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibGenre extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];

    public function book() : HasMany{
        return $this->hasMany(Book::class, 'genre_id');
    }
}
