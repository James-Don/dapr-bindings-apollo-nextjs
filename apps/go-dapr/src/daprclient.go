package main

import (
	"context"
	"encoding/json"
	"log"

	dapr "github.com/dapr/go-sdk/client"
)
type Post struct {
    Id int      `json:"id"`
    Title string          `json:"title"`
}
type GraphQLResp struct {
    Post Post  
}

func main() {
	client, err := dapr.NewClientWithPort("3501")
	// client, err := dapr.NewClientWithAddress("http://localhost:3500")
	if err != nil {
		panic(err)
	}
	defer client.Close()
	ctx := context.Background()

	// graphql binding query
	in := &dapr.InvokeBindingRequest{
		Name:      "graphqlbinding",
		Operation: "query",
		Metadata:  map[string]string{"query": "query{post(id:1){id title}}"},
	}
	resp, err := client.InvokeBinding(ctx, in)
	d := resp.Data
	log.Println(string(d))
	respObj := GraphQLResp{}
	json.Unmarshal(d, &respObj)
	log.Println(respObj.Post.Title)
	// log.Println(resp.Metadata)
	// log.Println(resp)
	// log.Println(err)	
	
	// app method
	// resp, err := client.InvokeMethod(ctx, "express-app", "test", "get")
	// log.Println(resp)
	// log.Println(err)	
}
