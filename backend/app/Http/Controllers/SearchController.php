<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Http\Resources\LibResource;
use App\Models\Book;
use App\Models\LibGenre;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request){
        //building the query for filtering
        $term = $request->query('term', '');
        $sortOrder = $request->query('sort', 'desc');
        $genreIds = $request->query('genre_id', []);

        $query = Book::search($term);

        if (!empty($genreIds)) {
            $query->whereIn('genre_id', (array)$genreIds); // Filter by multiple genre IDs
        }
        
        $book = $query->orderBy('date_publish', $sortOrder)->get();

        $book->load('genre');
        
        return BookResource::collection($book);
    }

    public function genre(){
        return LibResource::collection(LibGenre::all());
    }

}
