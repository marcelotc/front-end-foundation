'use client'

import { useState, useEffect } from "react";
import { supabaseClientWithAuth } from "../../../app/utils/supabase/supabaseClient";
import { useAuth } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';

const ImageUpload = () => {
  const { getToken, userId } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);
    setError(null);

    try {
      const supabaseToken = await getToken({ template: 'supabase' });
      const supabase = await supabaseClientWithAuth(supabaseToken as string);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(uuidv4(), image)


      if (error) {
        throw error;
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  async function getMedia() {
    const supabaseToken = await getToken({ template: 'supabase' });
    console.log('supabaseToken', supabaseToken)
    const supabase = await supabaseClientWithAuth(supabaseToken as string);

    const { data, error } = await supabase.storage.from('images').list('', {
      limit: 10,
      offset: 0,
      sortBy: {
        column: 'name', order:
          'asc'
      }
    });

    if (data) {
      setMedia(data as any);
    } else {
      console.log(71, error);
    }
  }

  useEffect(() => {
    getMedia();
  }, [userId, uploading])

  console.log('media', media)


  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p>Error: {error}</p>}

      {media.map((media: { name: string }) => {
          return (<>
            <div>
              <img src={`https://bsafsspqwxcudibbkjps.supabase.co/storage/v1/object/public/images/${media.name}`} />
            </div>
          </>
          )
        })}
    </div>
  );
};

export default ImageUpload;
