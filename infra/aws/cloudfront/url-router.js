var HISTORICAL_REDIRECTS = {
  "/blog/how-xheal-guided-me-to-the-right-lab-tests":
    "/blog/how-to-know-which-lab-tests-to-order",
  "/en/blog/how-xheal-guided-me-to-the-right-lab-tests":
    "/blog/how-to-know-which-lab-tests-to-order",
  "/bg/blog/how-xheal-guided-me-to-the-right-lab-tests":
    "/bg/blog/how-to-know-which-lab-tests-to-order",
};

function querySuffix(querystring) {
  var parts = [];

  for (var key in querystring) {
    if (!Object.prototype.hasOwnProperty.call(querystring, key)) {
      continue;
    }

    var entry = querystring[key];
    var values = entry.multiValue || [entry];

    for (var index = 0; index < values.length; index += 1) {
      parts.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(values[index].value || ""),
      );
    }
  }

  return parts.length ? "?" + parts.join("&") : "";
}

function redirect(location) {
  return {
    statusCode: 308,
    statusDescription: "Permanent Redirect",
    headers: {
      location: { value: location },
      "cache-control": { value: "public, max-age=300" },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var query = querySuffix(request.querystring);
  var hostHeader = request.headers.host;
  var host = hostHeader ? hostHeader.value.toLowerCase() : "";

  if (host === "www.xheal.ai") {
    return redirect("https://xheal.ai" + uri + query);
  }

  if (uri.indexOf("/api/") === 0) {
    return request;
  }

  if (uri === "/google9d80d9bffb68e2b1.html") {
    return request;
  }

  var normalizedUri = uri.length > 1 ? uri.replace(/\/+$/, "") : uri;

  if (
    Object.prototype.hasOwnProperty.call(
      HISTORICAL_REDIRECTS,
      normalizedUri,
    )
  ) {
    return redirect(HISTORICAL_REDIRECTS[normalizedUri] + query);
  }

  // The error document is an implementation detail of the static export.
  // CloudFront generates custom error responses on the origin-response path, so
  // this viewer-request redirect never runs for a genuine 404; it only affects
  // clients and crawlers that request the artifact directly. Redirecting them to
  // a real page keeps `/404.html` from being indexed as an HTTP 200.
  var errorDocument = normalizedUri.replace(/\.html$/, "");

  if (errorDocument === "/404" || errorDocument === "/en/404") {
    return redirect("/" + query);
  }

  if (errorDocument === "/bg/404") {
    return redirect("/bg" + query);
  }

  if (normalizedUri === "/en") {
    return redirect("/" + query);
  }

  if (
    normalizedUri.indexOf("/en/") === 0 &&
    !normalizedUri.endsWith(".html")
  ) {
    return redirect(normalizedUri.slice(3) + query);
  }

  if (normalizedUri !== uri) {
    return redirect(normalizedUri + query);
  }

  if (uri === "/index.html" || uri === "/en.html") {
    return redirect("/" + query);
  }

  if (uri.endsWith(".html")) {
    var cleanUri = uri.slice(0, -5);

    if (cleanUri.indexOf("/en/") === 0) {
      cleanUri = cleanUri.slice(3);
    }

    return redirect((cleanUri || "/") + query);
  }

  if (uri.indexOf("/.well-known/") === 0) {
    return request;
  }

  if (uri.endsWith(".txt")) {
    if (uri === "/robots.txt" || uri === "/llms.txt" || uri === "/404.txt") {
      return request;
    }

    if (uri === "/index.txt") {
      request.uri = "/en.txt";
      return request;
    }

    if (
      uri === "/en.txt" ||
      uri === "/bg.txt" ||
      uri.indexOf("/en/") === 0 ||
      uri.indexOf("/bg/") === 0
    ) {
      return request;
    }

    request.uri = "/en" + uri;
    return request;
  }

  if (/\.[^/]+$/.test(uri)) {
    return request;
  }

  if (uri === "/") {
    request.uri = "/en.html";
  } else if (uri === "/bg" || uri.indexOf("/bg/") === 0) {
    request.uri = uri + ".html";
  } else {
    request.uri = "/en" + uri + ".html";
  }

  return request;
}
