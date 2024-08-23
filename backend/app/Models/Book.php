<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Book extends Model
{
    use HasFactory, Searchable;
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'date_publish',
        'genre_id',
    ];

    protected $searchable = [
        'title', 
        'author'
    ];

    public function genre(): BelongsTo{
        return $this->belongsTo(LibGenre::class, 'genre_id');
    }

    public function toSearchableArray()
    {
        return[
            'title' => $this->title,
            'author' => $this->author,
        ];
    }
}
