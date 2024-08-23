<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    private $relation = [
        'genre'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Book::all();
        $data->load($this->relation);
        return BookResource::collection($data);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        $data = Book::create($request->validated());
        $data->load($this->relation);
        return BookResource::make($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $book->load($this->relation);
        return BookResource::make($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookRequest $request, Book $book)
    {
        $book->update($request->validated());
        $book->load($this->relation);
        return BookResource::make($book);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return ["result" => "Data Deleted"];
    }
}
