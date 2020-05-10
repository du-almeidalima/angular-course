import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.component';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getAsyncUserById(id: number): Observable<User> {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
  }

  public getSyncUser(id: number): User {
    const mockUsersData: User[] = [
      { id: 1, name: 'Test User 1', email: 'testuser@gmail.com' },
      { id: 2, name: 'Test User 2', email: 'testuser@gmail.com' },
      { id: 3, name: 'Test User 3', email: 'testuser@gmail.com' },
      { id: 4, name: 'Test User 4', email: 'testuser@gmail.com' },
      { id: 5, name: 'Test User 5', email: 'testuser@gmail.com' }
    ];

    return mockUsersData.find(u => u.id === id);
  }
}
