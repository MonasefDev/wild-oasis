import supabase, { supabaseUrl } from './supabase';
//* //////////////////////////////////////////////////////////////////

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}
//* //////////////////////////////////////////////////////////////////

export async function createEditCabin(newCabin, id) {
  const hasImagePath = !Boolean(newCabin.image?.name);

  const imageName = `${Math.floor(Math.random() * 1000000)}-${
    newCabin.image?.name
  }`.replace('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  //1. create new cabin

  let query = supabase.from('cabins');

  //A. Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  //2. upload Image

  if (!hasImagePath) {
    const { error: errorUploading } = await supabase.storage
      .from('cabins-image')
      .upload(imageName, newCabin.image);

    //3. delete newCabin if there was an error while uploading image

    if (errorUploading) {
      await supabase.from('cabins').delete().eq('id', newCabin.id);
      console.error(errorUploading);
      throw new Error(
        'the image not be uploaded, and the cabin was not be created'
      );
    }
  }
  return data;
}
//* //////////////////////////////////////////////////////////////////
export async function deleteCabin(id) {
  //
  console.log(id);
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
