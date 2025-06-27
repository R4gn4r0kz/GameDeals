import { TestBed } from '@angular/core/testing';

import { JuegosSqliteService } from './juegos-sqlite.service';

describe('JuegosSqliteService', () => {
  let service: JuegosSqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegosSqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
