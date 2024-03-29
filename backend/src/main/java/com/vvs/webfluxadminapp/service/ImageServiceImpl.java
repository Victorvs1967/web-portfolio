package com.vvs.webfluxadminapp.service;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

  private final ReactiveGridFsTemplate gridFsTemplate;

  @Override
  public Mono<Map<String, String>> upload(MultiValueMap<String, Part> file) {
    DBObject metadata = new BasicDBObject();
    metadata.put("_contentType", "image/ipeg");

    return Mono.just(file)
      .map(parts -> parts.toSingleValueMap())
      .map(map -> map.get("file"))
      .cast(FilePart.class)
      .flatMap(part -> gridFsTemplate.store(part.content(), part.filename(), metadata))
      .map(id -> Map.of("id", id.toHexString()))
      .map(_id -> _id);
  }

  @Override
  public Mono<?> download(String id) {
    return gridFsTemplate.findOne(query(where("_id").is(id)))
      .flatMap(gridFsTemplate::getResource)
      .map(r -> r.getContent());
  }

  @Override
  public Mono<Void> delete(String id) {
    return gridFsTemplate.delete(query(where("_id").is(id)));
  }

  @Override
  public Flux<Map<String, String>> listFiles() {
    return gridFsTemplate.find(new Query())
      .map(file -> Map.of("id", file.getObjectId().toHexString(), "name", file.getFilename()));
  }
}
