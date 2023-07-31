export const getAvatarFallback = (name?: string | null) => {
  if (!name) return "";
  const [first, second] = name.split(" ");
  console.log(first, second);
  return `${first?.[0]}${second ? second[0] : ""}`;
};

export const getUploadThingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://uploadthing.com/f/${fileKey}` : "";
};
