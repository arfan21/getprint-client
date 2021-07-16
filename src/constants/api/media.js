import axios from 'configs/axios';

export const media = {
    upload: (data = null, onUploadProgress = (e) => {}) =>
        axios.post('/v1/media', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        }),
};
