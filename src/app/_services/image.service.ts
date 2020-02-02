
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
export class ImageService {

    constructor(private http: HttpClient) {}
  
  
    public uploadImage(image: File) {
      const formData = new FormData();
  
      formData.append('image', image);
  
      return this.http.post(`${config.apiUrl}/users/register`, formData)
      
    }
  }